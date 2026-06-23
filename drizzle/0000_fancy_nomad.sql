CREATE TABLE `clients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`website` text,
	`type` text,
	`status` text,
	`priority` text,
	`description` text,
	`notes` json,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` text,
	`title` text NOT NULL,
	`project` text,
	`type` text,
	`date` text,
	`status` text,
	`description` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` text,
	`name` text NOT NULL,
	`client` text,
	`type` text,
	`status` text,
	`phase` text,
	`progress` text,
	`description` text,
	`next_steps` json,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` text,
	`title` text NOT NULL,
	`project` text,
	`priority` text,
	`status` text,
	`focus` text,
	`due` text,
	`description` text,
	`archived` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
