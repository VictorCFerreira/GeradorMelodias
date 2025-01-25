package GeradorMelodias.GeradorMelodias.dto.generic;

import java.sql.Date;

public record MelodiaDTO(
        Long id,
        String melodia,
        String intervalos,
        String instrumento,
        String escala,
        Integer oitavas,
        Integer bpm,
        Date dataGeracao
) {
}
