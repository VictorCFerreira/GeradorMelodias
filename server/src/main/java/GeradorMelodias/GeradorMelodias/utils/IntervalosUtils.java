package GeradorMelodias.GeradorMelodias.utils;

import GeradorMelodias.GeradorMelodias.utils.GeracaoMelodias.Escala;

public class IntervalosUtils {
    public String calcularIntervalos(String melodiaGerada, Escala escala) {
        System.out.println("melodia gerada calculo intervalos: " + melodiaGerada);
        String[] notas = escala.getNotas();
        String[] melodiaNotas = melodiaGerada.split(" ");
        int[][] contagemIntervalos = new int[notas.length][notas.length];

        for(String s : melodiaNotas){
            System.out.println("parte melodia: " + s);
        }

        //Começando de 1 pois o primeiro index refere-se ao instrumento
        for (int i = 1; i < melodiaNotas.length - 1; i++) {
            //Substring (0, length-1) para remover o indicador de tempo da nota
            int origem = getIndiceNota(notas, melodiaNotas[i].substring(0,melodiaNotas[i].length() - 2));
            int destino = getIndiceNota(notas, melodiaNotas[i + 1].substring(0, melodiaNotas[i + 1].length() - 2));

            if (origem != -1 && destino != -1) {
                contagemIntervalos[origem][destino]++;
            }
        }

        StringBuilder intervalosBuilder = new StringBuilder();
        for (int origem = 0; origem < notas.length; origem++) {
            for (int destino = 0; destino < notas.length; destino++) {
                if (contagemIntervalos[origem][destino] > 0) {
                    intervalosBuilder.append(notas[origem])
                            .append(">")
                            .append(notas[destino])
                            .append("-")
                            .append(contagemIntervalos[origem][destino])
                            .append("; ");
                }
            }
        }

        return intervalosBuilder.toString().trim();
    }

    private int getIndiceNota(String[] notas, String nota) {
        for (int i = 0; i < notas.length; i++) {
            if (notas[i].equals(nota)) {
                return i;
            }
        }
        return -1;
    }
}
