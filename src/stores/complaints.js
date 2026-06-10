import { defineStore } from 'pinia'

export const useComplaintsStore =
    defineStore(
        'complaints',
        {

            state: () => ({

                complaints: [

                    {
                        id: 1,

                        title: 'Robo bicicleta',

                        type: 'Robo',

                        description:
                            'Se produjo en la calle.',

                        address:
                            'Avenida Corrientes',

                        date:
                            '2026-06-09',

                        time:
                            '18:00'

                    }

                ]

            }),

            actions: {

                create(data) {

                    this.complaints.push({

                        id:
                            Date.now(),

                        ...data

                    })

                },

                update(id, data) {

                    const complaint =
                        this.complaints.find(
                            c => c.id === id
                        )

                    if (!complaint)
                        return

                    Object.assign(
                        complaint,
                        data
                    )

                },

                getById(id) {

                    return this.complaints.find(
                        c =>
                            c.id === Number(id)
                    )

                }

            }

        }
    )