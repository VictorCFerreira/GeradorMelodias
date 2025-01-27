package GeradorMelodias.GeradorMelodias.utils;

import GeradorMelodias.GeradorMelodias.enums.Escala;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

public class GeradorMelodias {
    private final Random random = new Random();

    public String gerarMelodia(String instrumento, Escala escala, int bpm, int oitavaInicial, int variacaoOitavas) {
        String[] notasEscala = escala.getNotas();
        HashMap<String, Integer> repeticoesNotas = new HashMap<>();
        System.out.println("hash map: " + repeticoesNotas);
        for (String nota : notasEscala) {
            repeticoesNotas.put(nota, 0);
        }
        System.out.println("hash map--: " + repeticoesNotas);
        int repeticoesMaximas = 4;
        int duracaoTotalSegundos = 15;

        double segundosPorBatida = 60.0 / bpm; // Tempo por batida
        StringBuilder construtorMelodia = new StringBuilder("I[" + instrumento + "] ");
        double tempoTotalAcumulado = 0.0; // Tempo total da melodia

        while (tempoTotalAcumulado < duracaoTotalSegundos) {
            List<String> notasDisponiveis = obterNotasDisponiveis(notasEscala, repeticoesNotas, repeticoesMaximas);
            if (notasDisponiveis.isEmpty()) {
                break;
            }

            String nota = notasDisponiveis.get(random.nextInt(notasDisponiveis.size()));

            //Randomiza oitava da nota
            int oitavaAleatoria = oitavaInicial + random.nextInt(variacaoOitavas + 1);
            nota += oitavaAleatoria;

            int[] duracoes = {1, 2, 4, 8, 16};
            int duracaoSorteada = duracoes[random.nextInt(duracoes.length)];
            String duracaoNota = obterDuracaoNota(duracaoSorteada);

            //Cálculo tempo da nota
            double tempoNota = segundosPorBatida * (4.0 / duracaoSorteada); // Multiplica por 4/duração (relativo à semibreve)

            //Verifica se a nota "cabe" no tempo
            if (tempoTotalAcumulado + tempoNota > duracaoTotalSegundos) {
                break;
            }

            System.out.println("nota: " + nota.replaceAll(String.valueOf(oitavaAleatoria),""));
            construtorMelodia.append(nota).append(duracaoNota).append(" ");
            repeticoesNotas.put(nota, repeticoesNotas.get(nota.replaceAll(String.valueOf(oitavaAleatoria),"")));
            tempoTotalAcumulado += tempoNota; //Adiciona ao tempo total
        }

        return construtorMelodia.toString().trim();
    }


    private String obterDuracaoNota(int valorNota) {
        return switch (valorNota) {
            case 1 -> "w"; // Semibreve
            case 2 -> "h"; // Mínima
            case 4 -> "q"; // Semínima
            case 8 -> "i"; // Colcheia
            case 16 -> "s"; // Semicolcheia
            default -> throw new IllegalArgumentException("Valor de nota inválido: " + valorNota);
        };
    }

    private List<String> obterNotasDisponiveis(String[] escala, HashMap<String, Integer> repeticoesNotas, int repeticoesMaximas) {
        List<String> notasDisponiveis = new ArrayList<>();
        for (String nota : escala) {
            if (repeticoesNotas.get(nota) < repeticoesMaximas) {
                notasDisponiveis.add(nota);
            }
        }
        return notasDisponiveis;
    }
}
