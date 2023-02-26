insert into category (label) values('tech');
insert into category (label) values('vetements');
insert into category (label) values('immobilier');
insert into category (label) values('animeaux');
insert into category (label) values('vehicules');

insert into account (mail, password, name, firstname) values ('clement.torti@hotmail.fr', '1234',  'clement', 'torti');
insert into account (mail, password, name, firstname) values ('example@gdoc.fr', '1234', 'toto', 'tata');

insert into product (price, description, label, id_owner) values (190.0, 'parfait etat dans l emballage', 'iphone 5', 1);
insert into product (price, description, label, id_owner) values (20.0, 'crackers', 'delicieux gateaux apérot à partager avec tout le monde', 2);

insert into categorise (id_category, id_product) values (1, 1);
insert into categorise (id_category, id_product) values (3, 2);


