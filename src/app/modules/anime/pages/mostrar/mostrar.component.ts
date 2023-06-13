import { Component, Input, OnInit } from "@angular/core";
import { ChartOption } from "../../grafica-b/chartType.interface";
import { IAnime } from "../../interface/anime";
import { AnimeService } from "../../service/anime.service";

@Component({
  selector: "app-mostrar",
  templateUrl: "./mostrar.component.html",
  styleUrls: ["./mostrar.component.scss"],
})
export class MostrarComponent implements OnInit {
  cards: IAnime[] = [];
  offset = 0;
  breadCrumbItems: Array<{}>;
  //para las graficas
  labels: string[] = [];
  dataGrafica = [];
  colores = [{ backgroundColor: ["#46FF33", "#08D0DA"] }];

  //para la gráfica de barras
  dataApex: Partial<ChartOption> = {
    series: [
      {
        name: "Series",
        data: [],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
    },
    title: {
      text: "",
    },
    xaxis: {
      categories: [],
    }
  };
  constructor(private animeService: AnimeService) {}

  term: string;
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Anime" },
      { label: "Mostrar", active: true },
    ];
    this.getCards();
  }

  getCards(nombreCard: string | null = null) {
    this.animeService
      .getCardsAnimeForma2(nombreCard, this.offset)
      .subscribe((res) => {
        console.log(res);
        this.cards = [...this.cards, ...res];
        this.graficar();
      });
  }
  graficar() {
    let grupos = {};
    this.cards.forEach((card) => {
      const llave = card.type;
      if (!grupos[llave]) {
        grupos[llave] = [];
      }
      grupos[llave].push(card);
    });
    console.log(grupos);

    let kyColor = "backgroundColor";

    //llaves para la ptra gráfica
    let keySeries = 'series';
    let data = 'data';
    let xaxis = 'xaxis';
    let categories = 'categories'
    for (const key in grupos) {
      this.labels.push(key);
      this.dataGrafica.push(grupos[key].length);
      this.colores[0][kyColor].push(this.colorHex());

      //datos para la otra gráfica
      this.dataApex[keySeries][0][data].push(grupos[key].length)
      this.dataApex[xaxis][categories].push(key);
    }

    this.dataApex.title.text = "Grafica de Anime";
    console.log("este", this.dataApex);

    console.log(this.dataGrafica);
    console.log(this.labels);
    console.log(this.colores);
  }

  generarLetra() {
    let letra = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "0",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    let numero = (Math.random() * 15).toFixed(0);
    return letra[numero];
  }

  colorHex() {
    let color = "";
    for (let i = 0; i < 6; i++) {
      color = color + this.generarLetra();
    }

    return "#" + color;
  }
}
