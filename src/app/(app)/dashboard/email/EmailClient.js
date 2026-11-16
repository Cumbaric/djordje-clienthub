"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { buildForwardDraft, buildReplyDraft } from "@/lib/email/compose";
import { fetchList, fetchMessage, updateSeen } from "@/lib/email/client";
import { useToast } from "@/components/ToastProvider";
import ComposeForm from "./ComposeForm";
import MessageList from "./MessageList";
import MessageView from "./MessageView";
import styles from "./email.module.css";

const FOLDERS = [
  { key: "inbox", label: "Inbox" },
  { key: "sent", label: "Sent" },
];

/**
 * Email workspace: folders | message list | message / compose.
 * `initial` pre-seeds state (used by tests and the visual preview); in the app it is empty
 * and everything is loaded from /api/email/* after mount.
 */
export default function EmailClient({ configured, ownAddress, initial }) {
  const toast = useToast();

  const [folder, setFolder] = useState(initial?.folder ?? "inbox");
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [listResult, setListResult] = useState({ key: null, data: null, error: "" });
  const [selectedUid, setSelectedUid] = useState(initial?.selectedUid ?? null);
  const [detail, setDetail] = useState(initial?.detail ?? { status: "idle", message: null, error: "" });
  const [compose, setCompose] = useState(initial?.compose ?? null);
  const [pane, setPane] = useState(initial?.pane ?? "list"); // mobile: list | view | compose
  const [busy, setBusy] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const selectedRef = useRef(null);

  // ---- list loading (cancels stale requests) ----
  // Status is derived: while the stored result belongs to an older request key the list is
  // "loading"; the effect only stores results asynchronously (no synchronous setState).
  const requestKey = `${folder}|${page}|${query}|${reloadToken}`;
  useEffect(() => {
    if (!configured || initial?.list) return undefined;
    const controller = new AbortController();
    fetchList({ folder, page, query, signal: controller.signal })
      .then((data) => setListResult({ key: requestKey, data, error: "" }))
      .catch((error) => {
        if (error?.name === "AbortError") return;
        setListResult((previous) => ({
          key: requestKey,
          data: previous.data,
          error: error?.message || "Greška pri učitavanju.",
        }));
      });
    return () => controller.abort();
  }, [configured, folder, page, query, reloadToken, requestKey, initial]);

  const list = initial?.list
    ? { ...initial.list, ...(listResult.data ? { data: listResult.data } : {}) }
    : {
        status: listResult.key !== requestKey ? "loading" : listResult.error ? "error" : "ready",
        data: listResult.data,
        error: listResult.error,
      };
  const reload = useCallback(() => setReloadToken((value) => value + 1), []);

  function changeFolder(next) {
    if (next === folder) {
      reload();
    } else {
      setFolder(next);
      setPage(1);
      setQuery("");
      setSearchInput("");
      setListResult({ key: null, data: null, error: "" });
    }
    setSelectedUid(null);
    setDetail({ status: "idle", message: null, error: "" });
    setCompose(null);
    setPane("list");
  }

  function submitSearch(event) {
    event.preventDefault();
    setPage(1);
    setQuery(searchInput.trim());
  }

  function clearSearch() {
    setSearchInput("");
    setQuery("");
    setPage(1);
  }

  // Optimistic update of one row and of the unread counter after a read/unread change.
  const applySeen = useCallback((uid, seen) => {
    setListResult((current) => {
      if (!current.data) return current;
      const was = current.data.items.find((item) => item.uid === uid);
      const items = current.data.items.map((item) => (item.uid === uid ? { ...item, seen } : item));
      let unreadCount = current.data.unreadCount;
      if (was && was.seen !== seen && Number.isInteger(unreadCount)) {
        unreadCount = Math.max(0, unreadCount + (seen ? -1 : 1));
      }
      return { ...current, data: { ...current.data, items, unreadCount } };
    });
  }, []);

  // ---- opening a message ----
  const openMessage = useCallback(
    async (item, uidValidity) => {
      selectedRef.current = item.uid;
      setSelectedUid(item.uid);
      setCompose(null);
      setPane("view");
      setDetail({ status: "loading", message: null, error: "" });
      try {
        const message = await fetchMessage({ folder, uid: item.uid, uidValidity });
        if (selectedRef.current !== item.uid) return; // user already opened another one
        setDetail({ status: "ready", message, error: "" });
        if (!message.seen && folder === "inbox") {
          // Opening marks it read. Explicit POST (reads never change server state).
          try {
            await updateSeen({ folder, uid: item.uid, uidValidity: message.uidValidity, seen: true });
            applySeen(item.uid, true);
            setDetail((current) => (current.message?.uid === item.uid ? { ...current, message: { ...current.message, seen: true } } : current));
          } catch {
            // stays unread; the user can retry with "Mark as read"
          }
        }
      } catch (error) {
        if (selectedRef.current !== item.uid) return;
        setDetail({ status: "error", message: null, error: error?.message || "Poruka nije učitana." });
      }
    },
    [folder, applySeen],
  );

  async function toggleSeen() {
    const message = detail.message;
    if (!message || busy) return;
    setBusy(true);
    try {
      await updateSeen({ folder, uid: message.uid, uidValidity: message.uidValidity, seen: !message.seen });
      applySeen(message.uid, !message.seen);
      setDetail((current) => ({ ...current, message: { ...current.message, seen: !message.seen } }));
      toast?.showToast(message.seen ? "Označeno kao nepročitano." : "Označeno kao pročitano.");
    } catch (error) {
      toast?.showToast(error?.message || "Promena nije uspela.", "error");
    } finally {
      setBusy(false);
    }
  }

  // ---- compose / reply / forward ----
  function startCompose(kind) {
    const message = detail.message;
    let draft = { to: [], cc: [], subject: "", body: "" };
    let context = null;
    let heading = "Nova poruka";
    if (kind !== "new" && message) {
      draft = kind === "forward" ? buildForwardDraft(message) : buildReplyDraft(message, kind, ownAddress);
      context = {
        mode: kind,
        folder,
        uid: message.uid,
        uidValidity: message.uidValidity,
        hasAttachments: message.attachments.some((attachment) => !attachment.inline),
      };
      heading = kind === "forward" ? "Prosledi poruku" : kind === "replyAll" ? "Odgovori svima" : "Odgovor";
    }
    setCompose({ draft, context, heading, key: `${kind}-${Date.now()}` });
    setPane("compose");
  }

  function closeCompose() {
    setCompose(null);
    setPane(detail.status === "ready" ? "view" : "list");
  }

  function handleSent(result) {
    toast?.showToast(result.warning ? result.warning : "Poruka je poslata.", result.warning ? "error" : "success");
    setCompose(null);
    setPane("list");
    if (folder === "sent") reload();
  }

  const data = list.data;
  const unread = folder === "inbox" ? data?.unreadCount : null;
  const unreadCount = Number.isInteger(unread) ? unread : null;

  if (!configured) {
    return (
      <section className={`dashboard-page ${styles.page}`}>
        <div className="dashboard-header">
          <p className="dashboard-label">Komunikacija</p>
          <h1>Email</h1>
          <p>Email servis nije podešen. Postavi email promenljive okruženja na serveru (vidi .env.example), pa osveži stranicu.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`dashboard-page ${styles.page}`}>
      <div className="dashboard-header">
        <p className="dashboard-label">Komunikacija</p>
        <h1>Email</h1>
        <p>Poslovna pošta {ownAddress}: pregled, odgovaranje i slanje poruka.</p>
      </div>

      <div className={styles.shell} data-pane={pane}>
        <nav className={`${styles.panel} ${styles.folders}`} aria-label="Email folderi">
          <button type="button" className={styles.composeButton} onClick={() => startCompose("new")}>
            Nova poruka
          </button>
          <div className={styles.folderNav}>
            {FOLDERS.map((entry) => (
              <button
                key={entry.key}
                type="button"
                className={`${styles.folderButton} ${folder === entry.key ? styles.folderButtonActive : ""}`}
                onClick={() => changeFolder(entry.key)}
                aria-current={folder === entry.key ? "page" : undefined}
              >
                {entry.label}
                {entry.key === "inbox" && unreadCount > 0 && (
                  <span className={styles.badge} aria-label={`${unreadCount} nepročitanih`}>
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className={styles.ownAddress}>{ownAddress}</p>
        </nav>

        <div className={`${styles.panel} ${styles.listPanel}`}>
          <div className={styles.listHeader}>
            <form className={styles.searchForm} onSubmit={submitSearch} role="search">
              <label className={styles.srOnly} htmlFor="email-search">
                Pretraži poruke
              </label>
              <input
                id="email-search"
                className={styles.searchInput}
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Pretraži poruke"
                maxLength={100}
              />
              <button type="submit" className={styles.secondaryButton}>
                Traži
              </button>
            </form>
            <div className={styles.listTools}>
              <span>
                {query ? (
                  <>
                    Rezultati za „{query}” ·{" "}
                    <button type="button" className={styles.linkButton} onClick={clearSearch}>
                      Poništi
                    </button>
                  </>
                ) : data ? (
                  `${data.total} ${data.total === 1 ? "poruka" : "poruka"}`
                ) : (
                  " "
                )}
              </span>
              <button type="button" className={styles.secondaryButton} onClick={reload} disabled={list.status === "loading"}>
                Osveži
              </button>
            </div>
          </div>

          {list.status === "error" && data && (
            <p className={styles.alert} role="alert">
              {list.error}{" "}
              <button type="button" className={styles.linkButton} onClick={reload}>
                Pokušaj ponovo
              </button>
            </p>
          )}

          <MessageList
            state={list}
            folder={folder}
            selectedUid={selectedUid}
            onSelect={(item) => openMessage(item, data.uidValidity)}
            onRetry={reload}
          />

          {data && data.totalPages > 1 && (
            <div className={styles.pager}>
              <button type="button" className={styles.secondaryButton} onClick={() => setPage(page - 1)} disabled={page <= 1 || list.status === "loading"}>
                ← Novije
              </button>
              <span>
                {data.page} / {data.totalPages}
              </span>
              <button type="button" className={styles.secondaryButton} onClick={() => setPage(page + 1)} disabled={page >= data.totalPages || list.status === "loading"}>
                Starije →
              </button>
            </div>
          )}
        </div>

        <div className={`${styles.panel} ${styles.viewPanel} ${styles.view}`}>
          {compose ? (
            <>
              <div className={styles.viewInner}>
                <button type="button" className={`${styles.secondaryButton} ${styles.backButton}`} onClick={closeCompose}>
                  ← Nazad
                </button>
              </div>
              <ComposeForm key={compose.key} draft={compose.draft} context={compose.context} heading={compose.heading} onClose={closeCompose} onSent={handleSent} />
            </>
          ) : (
            <MessageView
              state={detail}
              busy={busy}
              onBack={() => setPane("list")}
              onRetry={() => data && openMessage({ uid: selectedUid }, data.uidValidity)}
              onReply={() => startCompose("reply")}
              onReplyAll={() => startCompose("replyAll")}
              onForward={() => startCompose("forward")}
              onToggleSeen={toggleSeen}
            />
          )}
        </div>
      </div>
    </section>
  );
}
