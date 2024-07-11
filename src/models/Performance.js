export default class Performance {
    constructor(fetchedData) {
        let data = fetchedData.data.data;
        let kind = fetchedData.data.kind;

        this.performances = [];

        for (let i = 0; i < data.length; i++) {
            let category = kind[data[i].kind];
            switch (category) {
                case 'intensity':
                        category = 'Intensité';
                    break;
                case 'speed':
                        category = 'Vitesse';
                    break;
                case 'strength':    
                        category = 'Force';
                        break;
                case 'endurance':
                        category = 'Endurance'; 
                    break;
                case 'energy':
                        category = 'Energie';
                    break;
                case 'cardio':
                    category = 'Cardio';
                    break;
                default:
                    break;
            }
            let element = {
                category: category,
                value: data[i].value
            }
            this.performances.push(element)
        }
    }
}