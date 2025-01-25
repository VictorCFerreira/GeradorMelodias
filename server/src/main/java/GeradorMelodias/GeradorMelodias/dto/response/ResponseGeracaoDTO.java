package GeradorMelodias.GeradorMelodias.dto.response;

public record ResponseGeracaoDTO(
        Long idMelodia,
        byte[] midiBytes
) {
}
