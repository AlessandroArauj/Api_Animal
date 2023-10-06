import { con } from "./connection.js";

export async function ExcluirAnimal()

export async function AlterarAnimal(animal, id) {
    const comando = `
        update tb_animal
        set
            id_genero       =?,
            id_dieta        =?,
            nm_animal       =?,
            ds_idade        =?

        where id_animal     =?
    
    `

    const [resp] = await con.query(comando, [

        animal.genero,
        animal.dieta,
        animal.nome,
        animal.idade,
        id

    ])

    return resp.affectedRows;

}

export async function ConsultarAnimal(nome) {

    const comando = `

    SELECT
    A.id_animal AS Id,
    G.nm_genero AS Sexo,
    D.nm_dieta AS Dieta,
    A.nm_animal AS Animal,
    A.ds_idade AS Idade
FROM
    tb_animal AS A
INNER JOIN
    tb_genero AS G ON A.id_genero = G.id_genero
INNER JOIN
    tb_dieta_alimentar AS D ON A.id_dieta = D.id_dieta
WHERE
    A.nm_animal LIKE ?;
    `

    const [resp] = await con.query(comando, ['%' + nome + '%']);
    return resp

}

export async function InserirAnimal(Animal) {

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

export async function Dieta() {

    const comando = `

    select nm_dieta    as Dieta
     from tb_dieta_alimentar
    
    `

    const [resp] = await con.query(comando);
    return resp;

}

export async function SexoAnimal() {

    const comando = `

    select nm_genero    as Sexo
     from tb_genero
    
    `

    const [resp] = await con.query(comando);
    return resp;

}