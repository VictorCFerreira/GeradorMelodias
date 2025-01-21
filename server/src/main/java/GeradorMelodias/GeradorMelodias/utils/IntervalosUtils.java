package GeradorMelodias.GeradorMelodias.utils;

import GeradorMelodias.GeradorMelodias.utils.GeracaoMelodias.Escala;

public class IntervalosUtils {
    public String calcularIntervalos(String melodiaGerada, Escala escala) {
        String[] notas = escala.getNotas();
        String[] melodiaNotas = melodiaGerada.split(" ");
        int[][] contagemIntervalos = new int[notas.length][notas.length];

        for (int i = 0; i < melodiaNotas.length - 1; i++) {
            int origem = getIndiceNota(notas, melodiaNotas[i]);
            int destino = getIndiceNota(notas, melodiaNotas[i + 1]);

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
