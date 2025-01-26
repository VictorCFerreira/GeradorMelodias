package GeradorMelodias.GeradorMelodias.repository;

import GeradorMelodias.GeradorMelodias.entity.Download;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DownloadRepository extends JpaRepository<Download, Long> {
}
