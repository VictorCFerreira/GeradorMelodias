package GeradorMelodias.GeradorMelodias.dto.request;

import GeradorMelodias.GeradorMelodias.enums.Sensacao;

public record RequestAnaliseParametroSensacaoDTO(
        Sensacao sensacao,
        String parametro
        ) {
}
