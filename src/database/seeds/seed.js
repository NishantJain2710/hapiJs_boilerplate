exports.seed = async (knex) => {
    await knex('channel').insert(
        [
            {
                id:1,
                channel_name:'phone'
            }
        ]
    )
}