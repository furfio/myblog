/*
MySQL Backup
Source Server Version: 8.0.18
Source Database: react_blog
Date: 2020/2/24 23:04:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `admin_user`
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `article_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `introduce` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `addTime` int(11) DEFAULT NULL,
  `view_count` int(11) NOT NULL DEFAULT '0',
  `is_ok` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `message`
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `who` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `message` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `is_ok` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `type`
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `typeName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `orderNum` int(11) NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `admin_user` VALUES ('dzy','dzy123!@#');
INSERT INTO `article` VALUES ('1','1','React实战视频教程-技术胖Blog开发(更新04集)','### 简介\r\n~~~\r\nimport\r\n~~~\r\n如果不成功，你需要多式几次，这多是网络不顺畅造成的，所以没有什么更好的办法来解决。等待顺利完成后，可以打开文件夹，看一下是否自动生成了很多文件和文件夹。但是现在还没有安装相关的依赖包，所以要使用命令安装egg项目所需要的所有依赖包。\r\n因为npm的源还是比较慢的，所以需要多等一些时间。安装完成后，用cd命令进入service文件夹。 用脚手架自动生成项目的基本结构，在终端中直接输入下面的命令。','### 简介\r\n~~~\r\nimport\r\n~~~\r\n简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介','1582011168','0','1'), ('2','1','博客建立的步骤','# P00:add\n# P01:课程介绍和环境搭建\n# P02:课程介绍和环境搭建\n# P03课程介绍和环境搭建\n# P04:课程介绍和环境搭建\n# P05:课程介绍和环境搭建\n','简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介','1581955200','0','1'), ('4','2','222','### 简介\r\n~~~\r\nimport\r\n~~~\r\n如果不成功，你需要多式几次，这多是网络不顺畅造成的，所以没有什么更好的办法来解决。等待顺利完成后，可以打开文件夹，看一下是否自动生成了很多文件和文件夹。但是现在还没有安装相关的依赖包，所以要使用命令安装egg项目所需要的所有依赖包。\r\n因为npm的源还是比较慢的，所以需要多等一些时间。安装完成后，用cd命令进入service文件夹。 用脚手架自动生成项目的基本结构，在终端中直接输入下面的命令。','### 简介\r\n~~~\r\nimport\r\n~~~\r\n如果不成功，你需要多式几次，这多是网络不顺畅造成的，所以没有什么更好的办法来解决。等待顺利完成后，可以打开文件夹，看一下是否自动生成了很多文件和文件夹。但是现在还没有安装相关的依赖包，所以要使用命令安装egg项目所需要的所有依赖包。\r\n因为npm的源还是比较慢的，所以需要多等一些时间。安装完成后，用cd命令进入service文件夹。 用脚手架自动生成项目的基本结构，在终端中直接输入下面的命令。','1580832000','1058','0'), ('5','3','222','### 简介\r\n~~~\r\nimport\r\n~~~\r\n如果不成功，你需要多式几次，这多是网络不顺畅造成的，所以没有什么更好的办法来解决。等待顺利完成后，可以打开文件夹，看一下是否自动生成了很多文件和文件夹。但是现在还没有安装相关的依赖包，所以要使用命令安装egg项目所需要的所有依赖包。\r\n因为npm的源还是比较慢的，所以需要多等一些时间。安装完成后，用cd命令进入service文件夹。 用脚手架自动生成项目的基本结构，在终端中直接输入下面的命令。','### 简介\r\n~~~\r\nimport\r\n~~~\r\n如果不成功，你需要多式几次，这多是网络不顺畅造成的，所以没有什么更好的办法来解决。等待顺利完成后，可以打开文件夹，看一下是否自动生成了很多文件和文件夹。但是现在还没有安装相关的依赖包，所以要使用命令安装egg项目所需要的所有依赖包。\r\n因为npm的源还是比较慢的，所以需要多等一些时间。安装完成后，用cd命令进入service文件夹。 用脚手架自动生成项目的基本结构，在终端中直接输入下面的命令。','222','2','0'), ('6','2','44','33','33','33','33','0'), ('7','3','111','### 简介\r\n~~~\r\nimport\r\n~~~\r\n如果不成功，你需要多式几次，这多是网络不顺畅造成的，所以没有什么更好的办法来解决。等待顺利完成后，可以打开文件夹，看一下是否自动生成了很多文件和文件夹。但是现在还没有安装相关的依赖包，所以要使用命令安装egg项目所需要的所有依赖包。\r\n因为npm的源还是比较慢的，所以需要多等一些时间。安装完成后，用cd命令进入service文件夹。 用脚手架自动生成项目的基本结构，在终端中直接输入下面的命令。','### 简介\r\n~~~\r\nimport\r\n~~~\r\n如果不成功，你需要多式几次，这多是网络不顺畅造成的，所以没有什么更好的办法来解决。等待顺利完成后，可以打开文件夹，看一下是否自动生成了很多文件和文件夹。但是现在还没有安装相关的依赖包，所以要使用命令安装egg项目所需要的所有依赖包。\r\n因为npm的源还是比较慢的，所以需要多等一些时间。安装完成后，用cd命令进入service文件夹。 用脚手架自动生成项目的基本结构，在终端中直接输入下面的命令。','111','111','1'), ('8','2','5555','### 简介\r\n~~~\r\nimport\r\n~~~\r\n如果不成功，你需要多式几次，这多是网络不顺畅造成的，所以没有什么更好的办法来解决。等待顺利完成后，可以打开文件夹，看一下是否自动生成了很多文件和文件夹。但是现在还没有安装相关的依赖包，所以要使用命令安装egg项目所需要的所有依赖包。\r\n因为npm的源还是比较慢的，所以需要多等一些时间。安装完成后，用cd命令进入service文件夹。 用脚手架自动生成项目的基本结构，在终端中直接输入下面的命令。','### 简介\r\n~~~\r\nimport\r\n~~~\r\n如果不成功，你需要多式几次，这多是网络不顺畅造成的，所以没有什么更好的办法来解决。等待顺利完成后，可以打开文件夹，看一下是否自动生成了很多文件和文件夹。但是现在还没有安装相关的依赖包，所以要使用命令安装egg项目所需要的所有依赖包。\r\n因为npm的源还是比较慢的，所以需要多等一些时间。安装完成后，用cd命令进入service文件夹。 用脚手架自动生成项目的基本结构，在终端中直接输入下面的命令。','1580832000','0','0');
INSERT INTO `message` VALUES ('1','小明','66666666','1'), ('2','Mike','Good','1'), ('3','A','gkd','1'), ('4','22','22','0');
INSERT INTO `type` VALUES ('1','工作','1','edit'), ('2','读书','2','read'), ('3','生活','3','smile');
