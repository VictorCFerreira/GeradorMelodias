package GeradorMelodias.GeradorMelodias.dto.request;

import GeradorMelodias.GeradorMelodias.entity.Parametros;

public record CreateMelodiaDTO(
        String melodia,
        String intervalos,
        Long parametrosId
) {
}
