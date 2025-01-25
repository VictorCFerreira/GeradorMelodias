package GeradorMelodias.GeradorMelodias.dto.response;

public record ResponseMelodiaMidiDTO(
        Long idMelodia,
        byte[] midiBytes
) {
}
