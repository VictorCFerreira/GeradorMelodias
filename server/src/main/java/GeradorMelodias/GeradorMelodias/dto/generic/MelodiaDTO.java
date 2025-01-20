package GeradorMelodias.GeradorMelodias.dto.generic;

import GeradorMelodias.GeradorMelodias.entity.Parametros;

public record MelodiaDTO(
        Long id,
        String notas,
        String intervalos,
        Parametros parametros
) {
}
