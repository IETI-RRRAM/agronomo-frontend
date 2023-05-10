interface AnimalDataGeneral {
    idRanch: string;
    name: string;
    type: string;
    gender: string;
    stage: string;
    weight: string;
    breed: string;
    age: string;
}

interface AnimalDataFinance {
    moneyProduced: number;
    moneySpent: number;
    profitability: number;
}

interface AnimalDataProduction {
    productions: {
      product: string;
      quantity: number;
      measurement: string;
      date: string;
    }[];
    totalProduction: number;
}

interface AnimalDataReproduccion {
    id: string;
    idAnimal: string;
    births: {
      date: string;
      idBreeding: string;
    }[];
    status: string;
    partner: string;
    lastHeats: string[];
    nextHeat: string;
    cycleDuration: number;
}
  
interface AnimalDataHealth {
    idAnimal: string;
    status: string;
    treatments: {
        name: string;
        description: string;
        startDate: string,
        endDate: string,
    }[];
    meds: {
        name: string;
        description: string;
        startDate: string,
        endDate: string,
        dose: string,
    }[];
    alerts: {
        name: string;
        description: string;
        startDate: string,
        endDate: string,
    }[];
}

function keyWordsAnimalGeneral(dataGeneral: AnimalDataGeneral) {
    return {
        Nombre: dataGeneral.name,
        Tipo: dataGeneral.type,
        Genero: dataGeneral.gender,
        Raza: dataGeneral.stage,
        Peso: dataGeneral.weight,
        Crias: dataGeneral.breed,
        Edad: dataGeneral.age,
      };  
}

function keyWordsAnimalFinance(produccion: AnimalDataFinance) {
    return {
      DineroProducido: produccion.moneyProduced,
      DineroGastado: produccion.moneySpent,
      Rentabilidad: produccion.profitability,
    };
}

function keyWordsAnimalProduction(production: AnimalDataProduction) {
    return {
      Productos: production.productions.map((produccion) => ({
        Producto: produccion.product,
        Cantidad: produccion.quantity,
        Unidad: produccion.measurement,
        Fecha: new Date(produccion.date).toLocaleDateString(),
      })),
      ProduccionTotal: production.totalProduction,
    };
}

function keyWordsAnimalReproduction(reproduccion: AnimalDataReproduccion) {
    return {
      Partos: reproduccion.births.map((birth) => ({
        Fecha: new Date(birth.date).toLocaleString(),
        IdCria: birth.idBreeding,
      })),
      Estado: reproduccion.status,
      Pareja: reproduccion.partner,
      UltimosCelos: reproduccion.lastHeats,
      ProximoCelo: new Date(reproduccion.nextHeat).toLocaleDateString(),
      DuracionCiclo: reproduccion.cycleDuration,
    };
}

function keyWordsAnimalHealth(dataHealth: AnimalDataHealth) {
    const treatments = dataHealth.treatments.map((treatment) => ({
      Nombre: treatment.name,
      Descripcion: treatment.description,
      FechaInicio: new Date(treatment.startDate).toLocaleString(),
      FechaFin: new Date(treatment.endDate).toLocaleString(),
    }));
  
    const meds = dataHealth.meds.map((med) => ({
      Nombre: med.name,
      Descripcion: med.description, 
      FechaInicio: new Date(med.startDate).toLocaleString(),
      FechaFin: new Date(med.endDate).toLocaleString(),
      Dosis: med.dose
    }));
  
    const alerts = dataHealth.alerts.map((alert) => ({
      Nombre: alert.name,
      Descripcion: alert.description, 
      FechaInicio: new Date(alert.startDate).toLocaleString(),
      FechaFin: new Date(alert.endDate).toLocaleString(),
    }));
  
    return {
      Estado: dataHealth.status,
      Tratamientos: treatments,
      Medicamentos: meds,
      Alertas: alerts
    };
  }
  
export {keyWordsAnimalGeneral, keyWordsAnimalFinance, keyWordsAnimalProduction, keyWordsAnimalReproduction, keyWordsAnimalHealth}