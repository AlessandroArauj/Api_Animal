
use infocdb;


create table tb_animal(
    id_animal   int primary key auto_increment,
    id_genero   int,
    id_dieta    int,
    nm_animal  varchar(400),
    ds_idade   varchar(400),
     
     foreign key (id_genero) references  tb_genero (id_genero),
     foreign key (id_dieta)  references  tb_dieta_alimentar (id_dieta) 
     
    );
    
    create table tb_genero(
    id_genero  int primary key auto_increment,
    nm_genero  varchar(400)
    
    );
    
    create table tb_dieta_alimentar(
    id_dieta  int primary key auto_increment,
    nm_dieta  varchar(400)
    
    );
    