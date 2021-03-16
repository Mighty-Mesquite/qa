-- DROP DATABASE IF EXISTS questions;
CREATE DATABASE IF NOT EXISTS questions;

USE questions;
-- ---
-- Table 'questions'
--
-- ---

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `questions_id` INTEGER NOT NULL AUTO_INCREMENT,
  `question_date` DATETIME NOT NULL ,
  `question_body` TEXT(1000) NOT NULL ,
  `asker_name` VARCHAR(60) NULL ,
  `product_id` INTEGER NOT NULL ,
  `question_helpfulness` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `reported` BINARY NOT NULL DEFAULT 0,
  PRIMARY KEY (`questions_id`)
);

-- ---
-- Table 'answer'
--
-- ---

DROP TABLE IF EXISTS `answers`;

CREATE TABLE `answer` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `body` TEXT(1000) NOT NULL ,
  `date_` DATETIME NOT NULL ,
  `answerer_name` VARCHAR(60) NOT NULL ,
  `helpfulness` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  `questions_id_question` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_answer` INTEGER NOT NULL ,
  `url` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `answer` ADD FOREIGN KEY (questions_id_question) REFERENCES `questions` (`questions_id`);
ALTER TABLE `photos` ADD FOREIGN KEY (id_answer) REFERENCES `answer` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `answer` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `questions` (`questions_id`,`date_`,`question_body`,`asker_name`,`product_id`,`helpfulness`,`reported`) VALUES
-- ('','','','','','','');
-- INSERT INTO `answer` (`id`,`body`,`date_`,`answerer_name`,`helpfulness`,`questions_id_question`) VALUES
-- ('','','','','','');
-- INSERT INTO `photos` (`id`,`id_answer`,`url`) VALUES
-- ('','','');