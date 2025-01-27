package GeradorMelodias.GeradorMelodias.entity;

import GeradorMelodias.GeradorMelodias.enums.Sensacao;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name = "avaliacao")
@Entity
@Getter
@Setter
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Integer nota;

    @Enumerated(EnumType.STRING)
    private Sensacao sensacao;

    @OneToOne
    @JoinColumn(name = "id_melodia", nullable = false)
    private Melodia melodia;
}
