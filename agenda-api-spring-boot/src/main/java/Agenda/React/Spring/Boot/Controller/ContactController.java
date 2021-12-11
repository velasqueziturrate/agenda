package Agenda.React.Spring.Boot.Controller;

import Agenda.React.Spring.Boot.Exception.ResourceNotFoundException;
import Agenda.React.Spring.Boot.Model.Contact;
import Agenda.React.Spring.Boot.Repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/contacts")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    //Get all contacts
    @GetMapping
    public List<Contact> getAllContacts(){
        return contactRepository.findAll();
    }

    //Get Contact by id
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id){
        Contact contact = contactRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contact not exist with id: " + id));
        return ResponseEntity.ok(contact);
    }

    //Create contact
    @PostMapping
    public Contact createContact(@RequestBody Contact contact) {
        return contactRepository.save(contact);
    }

    //Update contact
    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @RequestBody Contact contactDetails){
        Contact updateContact = contactRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contact not exist with id: " + id));

        updateContact.setFirstName(contactDetails.getFirstName());
        updateContact.setLastName(contactDetails.getLastName());
        updateContact.setEmailId(contactDetails.getEmailId());
        updateContact.setCellphone(contactDetails.getCellphone());

        contactRepository.save(updateContact);

        return ResponseEntity.ok(updateContact);
    }

    //Delete contact
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteContact(@PathVariable Long id){
        Contact contact = contactRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Contact not exist with id: " + id));

        contactRepository.delete(contact);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
