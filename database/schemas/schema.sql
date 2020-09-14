drop database if exists wolfofwarframe;

create database wolfofwarframe;

use wolfofwarframe;

/*Table used to check when data was last updated: system should load data or prompt user to do so when market data is too far out of date*/
create table update_log (
  last_updated datetime
);

/*basic item list: contains items and their basic reference information*/
create table item_info (
  item_name varchar(50) not null,
  id varchar(50) not null,
  url_name varchar(50) not null,
  thumb varchar(255) not null
);

/*ducat information for each item*/
create table ducat_info (
  /*note: item_id is the item field in the WFM /ducats API*/
  item_id varchar(50) not null,
  ducats int not null,
  volume int not null,
  ducats_per_plat decimal not null
);