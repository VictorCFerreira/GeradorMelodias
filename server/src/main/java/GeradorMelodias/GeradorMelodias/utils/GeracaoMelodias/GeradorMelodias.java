package GeradorMelodias.GeradorMelodias.utils.GeracaoMelodias;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

public class GeradorMelodias {
    private final Random random = new Random();

    public String gerarMelodia(String instrumento, Escala escala, int bpm, int oitavaInicial, int variacaoOitavas) {
        String[] notasEscala = escala.getNotas();
        HashMap<String, Integer> repeticoesNotas = new HashMap<>();
        for (String nota : notasEscala) {
            repeticoesNotas.put(nota, 0);
        }
        int repeticoesMaximas = 4;
        int duracaoTotalSegundos = 15;

        double segundosPorBatida = 60.0 / bpm; // Tempo por batida em segundos
        StringBuilder construtorMelodia = new StringBuilder("I[" + instrumento + "] ");
        double tempoTotalAcumulado = 0.0; // Tempo total acumulado da melodia

        while (tempoTotalAcumulado < duracaoTotalSegundos) {
            List<String> notasDisponiveis = obterNotasDisponiveis(notasEscala, repeticoesNotas, repeticoesMaximas);
            if (notasDisponiveis.isEmpty()) {
                break;
            }

            String nota = notasDisponiveis.get(random.nextInt(notasDisponiveis.size()));

            // Escolhe uma oitava aleatória dentro do intervalo permitido
            int oitavaAleatoria = oitavaInicial + random.nextInt(variacaoOitavas + 1);
            nota += oitavaAleatoria; // Adiciona a oitava à nota

            int[] duracoes = {1, 2, 4, 8, 16};
            int duracaoSorteada = duracoes[random.nextInt(duracoes.length)];
            String duracaoNota = obterDuracaoNota(duracaoSorteada);

            // Calcula o tempo que essa nota ocupará
            double tempoNota = segundosPorBatida * (4.0 / duracaoSorteada); // Multiplica por 4/duração (relativo à semibreve)

            // Verifica se a nota cabe no tempo total permitido
            if (tempoTotalAcumulado + tempoNota > duracaoTotalSegundos) {
                break;
            }

            construtorMelodia.append(nota).append(duracaoNota).append(" ");
            repeticoesNotas.put(nota, repeticoesNotas.get(nota) + 1);
            tempoTotalAcumulado += tempoNota; // Atualiza o tempo total acumulado
        }

        return construtorMelodia.toString().trim();
    }


    private String obterDuracaoNota(int valorNota) {
        switch (valorNota) {
            case 1: return "w"; // Semibreve
            case 2: return "h"; // Mínima
            case 4: return "q"; // Semínima
            case 8: return "i"; // Colcheia
            case 16: return "s"; // Semicolcheia
            default: throw new IllegalArgumentException("Valor de nota inválido: " + valorNota);
        }
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
