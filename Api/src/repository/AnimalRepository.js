import { con } from "./connection.js";

export async function ConsultarAnimal(nome){

    const comando = `

        select
            id_animal                   as Id,
            id_genero                   as Sexo,
            id_dieta                    as Dieta,
            nm_animal                   as Animal,
            ds_idade                    as Idade

        from tb_animal                  as Animais
        inner join tb_genero            as P    on animal.id_genero = P.id_genero
        inner join tb_dieta_alimentar   as M    on animal.id_dieta = M.id_dieta

        where   nm_animal like ?

    `

    const [resp] = await con.query(comando, ['%' + nome + '%']);
    return resp

}

export async function InserirAnimal(Animal){

    const comando = `
    
        insert into tb_animal (id_genero, id_dieta, nm_animal, ds_idade)
                    values    (?, ?, ?, ?)
    
    `

    const [resp] = await con.query(comando, [

        Animal.genero,
        Animal.dieta,
        Animal.nome,
        Animal.idade

    ]);

    Animal.id = resp.insertId;
    return resp;

}


export async function SexoAnimal(){

    const comando = `

    select nm_genero    as Sexo
     from tb_genero
    
    `

    const [resp] = await con.query(comando);
    return resp;

}