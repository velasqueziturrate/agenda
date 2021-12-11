package Agenda.React.Spring.Boot.Repository;

import Agenda.React.Spring.Boot.Model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
}
