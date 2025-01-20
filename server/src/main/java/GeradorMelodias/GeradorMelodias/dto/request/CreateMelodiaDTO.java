package GeradorMelodias.GeradorMelodias.dto.request;

import GeradorMelodias.GeradorMelodias.entity.Parametros;

public record CreateMelodiaDTO(
        String notas,
        String intervalos,
        Long parametrosId
) {
}
