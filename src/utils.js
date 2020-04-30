export const monthNames = [null, ...Array.from({length: 12}, (x, i) => {
    const str = new Date(0, i + 1, 0).toLocaleDateString('pl-PL', {month: 'long'});
    return str.charAt(0).toUpperCase() + str.slice(1)
})];

export const years = [
    {name: 2020},
    {name: 2021},
    {name: 2022},
    {name: 2023},
    {name: 2024},
    {name: 2025}
];

export const randCol = [
    {
        name: "Matematyka",
        color: 'D56717'
    },
    {
        name: "Język Polski",
        color: 'D52217'
    },
    {
        name: "Fizyka",
        color: '48D517'
    }, {
        name: "Język Niemiecki",
        color: '17B2D5'
    },
    {
        name: "Biologia",
        color: 'D5C217'
    },
    {
        name: "WF",
        color: 'D56893'
    }
];

export const assignments = [
    {
        title: 'Rozprawka',
        subject: 'Język Polski',
        dueDate: new Date(2020, 5, 3, 10, 10),
        desc: 'Rozprawka ma być o czymś tam związanym z językiem polskim sample text ja tu tylko przedłużam '
    },
    {
        title: 'Charakterystyka',
        subject: 'Język Polski',
        dueDate: new Date(2020, 5, 12, 10, 10),
        desc: 'Rozprawka ma być o czymś tam związanym z językiem polskim sample text ja tu tylko przedłużam '
    },
    {
        title: 'Sprawdzian Homograficzna',
        subject: 'Matematyka',
        dueDate: new Date(2020, 4, 31, 12,),
        desc: 'Rozprawka ma być o czymś tam związanym z językiem polskim sample text ja tu tylko przedłużam '
    },
    {
        title: 'System UI',
        subject: 'Fizyka',
        dueDate: new Date(2020, 5, 21, 15, 20),
        desc: 'Rozprawka ma być o czymś tam związanym z językiem polskim sample text ja tu tylko przedłużam '
    },
    {
        title: 'Rozprawka',
        subject: 'Język Polski',
        dueDate: new Date(2020, 5, 3, 10, 10),
        desc: 'Rozprawka ma być o czymś tam związanym z językiem polskim sample text ja tu tylko przedłużam '
    },
    {
        title: 'Coś z wfu',
        subject: 'WF',
        dueDate: new Date(2020, 5, 3, 10, 10),
        desc: 'Rozprawka ma być o czymś tam związanym z językiem polskim sample text ja tu tylko przedłużam '
    }
];