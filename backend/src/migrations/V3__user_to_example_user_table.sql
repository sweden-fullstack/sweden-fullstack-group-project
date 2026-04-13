ALTER TABLE `user` ADD CONSTRAINT `unique_gmail` UNIQUE (gmail);

RENAME TABLE `user` TO `user_example`;

