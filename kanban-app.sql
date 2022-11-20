CREATE TABLE `users` (
  `id` int PRIMARY KEY,
  `fullname` varchar(255),
  `email` text,
  `tgl_lahir` text,
  `alamat` text,
  `image` varchar(255),
  `refresh_token` varchar(255),
  `role` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp,
  `deleted_at` timestamp
);

CREATE TABLE `task` (
  `id` int PRIMARY KEY,
  `title` varchar(255),
  `description` text,
  `id_label` text,
  `due_date` text,
  `created_by` int,
  `status_task` int,
  `created_at` timestamp,
  `updated_at` timestamp,
  `deleted_at` timestamp
);

CREATE TABLE `assigned` (
  `id` int PRIMARY KEY,
  `id_task` int,
  `id_user` int
);

CREATE TABLE `label` (
  `id` int PRIMARY KEY,
  `name` varchar(255),
  `color` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp,
  `deleted_at` timestamp
);

CREATE TABLE `log_activity` (
  `id` int PRIMARY KEY,
  `description` text,
  `category` ENUM ('insert', 'update', 'delete'),
  `created_by` int,
  `created_at` timestamp,
  `updated_at` timestamp,
  `deleted_at` timestamp
);

ALTER TABLE `assigned` ADD FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

ALTER TABLE `task` ADD FOREIGN KEY (`id_label`) REFERENCES `label` (`id`);

ALTER TABLE `assigned` ADD FOREIGN KEY (`id_task`) REFERENCES `task` (`id`);

ALTER TABLE `task` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

ALTER TABLE `log_activity` ADD FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);
