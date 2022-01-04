import faker from 'faker/locale/tr';

export const player = [
    {
        id:'16',
        name:faker.name.findName(),
        league: faker.random.alphaNumeric() + ". Lig",
        club:"Trabzon",
        position:"Defans",
        age:faker.random.alphaNumeric(),
        goal:faker.random.alphaNumeric(),
        assist:faker.random.alphaNumeric(),
        runningDistance: faker.random.alphaNumeric(),
        marketValue: faker.random.alphaNumeric(),
        contractTerm: faker.random.alphaNumeric(),
        tokenValue: faker.random.alphaNumeric(),
        tokenQuantity:faker.random.alphaNumeric(),
        soldToken: faker.random.alphaNumeric(),
        preDemandTime: faker.random.alphaNumeric()
    },
    {
        id:'17',
        name:faker.name.findName(),
        league: faker.random.alphaNumeric() + ". Lig",
        club:"Trabzon",
        position:"Defans",
        age:faker.random.alphaNumeric(),
        goal:faker.random.alphaNumeric(),
        assist:faker.random.alphaNumeric(),
        runningDistance: faker.random.alphaNumeric(),
        marketValue: faker.random.alphaNumeric(),
        contractTerm: faker.random.alphaNumeric(),
        tokenValue: faker.random.alphaNumeric(),
        tokenQuantity:faker.random.alphaNumeric(),
        soldToken: faker.random.alphaNumeric(),
        preDemandTime: faker.random.alphaNumeric()
    },
]