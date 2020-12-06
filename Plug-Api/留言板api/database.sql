use liuyan;
CREATE TABLE `obj_message` (
  `id` mediumint(9) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '姓名',
  `head_image` varchar(1000) DEFAULT NULL COMMENT '头像',
  `word` mediumtext COMMENT '内容',
  `time` datetime DEFAULT NULL COMMENT '时间',
  `site` varchar(255) DEFAULT NULL COMMENT 'site',
  `email` varchar(255) DEFAULT NULL COMMENT 'email',
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4