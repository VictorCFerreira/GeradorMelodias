package repository;

import entity.Melodia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MelodiaRepository extends JpaRepository<Melodia, Long> {
}
