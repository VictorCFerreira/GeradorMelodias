package GeradorMelodias.GeradorMelodias.dto.generic;

public record ParametrosDTO(
        Long id,
         String instrumento,
         String escala,
         Integer oitavas,
         Integer bpm
) {
}
