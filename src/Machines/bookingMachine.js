import { createMachine, assign } from "xstate";
import { fetchCountries } from "../Utils/api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        // El invoke: es la manera de usamos para invocar un servicio
        id: "getCountries",
        src: () => fetchCountries, // Es la funcion que se va llamar en ese servicio
        onDone: {
          // onDone: Es la propiedad que se llama cuando la funcion src finalice de manera exitosa
          target: "success",
          actions: assign({
            countries: (context, event) => event.data,
          }),
          onError: {
            target: "failure",
            actions: assign({
              error: "Request failure",
            }),
          },
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: {
          target: "loading",
        },
      },
    },
  },
};

const bookingMachine = createMachine(
  {
    id: "buy plane tickets",
    initial: "initial",
    context: {
      passengers: [], // El que guardara el nombre de los pasajeros introduciodos
      selectedCountry: "", // Donde se guarda el pais seleccionado en la busqueda
      countries: [],
      error: "",
    },
    states: {
      initial: {
        on: {
          START: {
            target: "search",
            actions: "imprimirInicio", // accion de transicion
          },
        },
      },
      search: {
        entry: "imprimirEntrada", // accion de entrada
        exit: "imprimirSalida", // accion de salida
        on: {
          CONTINUE: {
            target: "passengers",
            actions: assign({
              selectedCountry: (context, event) => event.selectedCountry, // Con el assign actualizamos el contexto de la maquina
            }),
          },
          CANCEL: {
            target: "initial",
            actions: "reset",
          },
        },
        ...fillCountries,
      },
      passengers: {
        on: {
          DONE: {
            target: "tickets",
            cond: "moreThanOnePassenger", // cond: (condicion) sirve para llamar a los guards
          },
          CANCEL: {
            target: "initial",
            actions: "reset",
          },
          ADD: {
            target: "passengers",
            actions: assign((context, event) =>
              context.passengers.push(event.newPassenger)
            ),
          },
        },
      },
      tickets: {
        on: {
          FINISH: {
            target: "initial",
            actions: "reset",
          },
        },
        after: {
          5000: {
            target: "initial",
            actions: "reset",
          },
        },
      },
    },
  },
  {
    actions: {
      imprimirInicio: () => console.log("Iniciooooo!!!"),
      imprimirEntrada: () => console.log("Entrada!!!!"),
      imprimirSalida: () => console.log("salidaaa!!"),
      reset: assign({
        selectedCountry: "",
        passengers: [],
        countries: [],
        error: "",
      }),
    },
    guards: {
      // Guards: son las guardines para realizar trancisiones protegidas.
      moreThanOnePassenger: (context) => {
        return context.passengers.length > 0; // Si la lista de pasajeros tiene al menos uno, dejara hacer la transicion al siguiente estado.
      },
    },
  }
);

export default bookingMachine;
