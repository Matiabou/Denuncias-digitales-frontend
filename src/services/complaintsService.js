import {
    complaints
}
    from '../mocks/complaints'

export async function getComplaints() {

    return complaints

}

export async function createComplaint(
    data
) {

    const newComplaint = {

        id:
            Date.now(),

        ...data

    }

    complaints.push(
        newComplaint
    )

    return newComplaint

}

export async function updateComplaint(
    id,
    data
) {

    const index =
        complaints.findIndex(
            c => c.id === id
        )

    if (index !== -1) {

        complaints[index] = {

            ...complaints[index],

            ...data

        }

    }

    return complaints[index]

}