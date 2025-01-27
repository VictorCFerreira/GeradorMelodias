package GeradorMelodias.GeradorMelodias.dto.response;

import GeradorMelodias.GeradorMelodias.enums.Sensacao;

public record AnaliseSensacaoAvaliadaPorParametro(
        String parametro,
        Sensacao sensacao,
        Long quantidadeMelodiaAval
) {

}
