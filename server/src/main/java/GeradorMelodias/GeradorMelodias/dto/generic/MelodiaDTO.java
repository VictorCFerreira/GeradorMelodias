package GeradorMelodias.GeradorMelodias.dto.generic;

import GeradorMelodias.GeradorMelodias.entity.Parametros;

public record MelodiaDTO(
        Long id,
        String melodia,
        String intervalos,
        Parametros parametros
) {
}
