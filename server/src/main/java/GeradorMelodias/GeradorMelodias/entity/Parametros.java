package GeradorMelodias.GeradorMelodias.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Table(name = "parametros")
@Entity
@Getter
@Setter
public class Parametros {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String instrumento;
    private String escala;
    private Integer oitavas;
    private Integer bpm;
}
