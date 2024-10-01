package com.leilao.backend.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilao.backend.model.Person;
import com.leilao.backend.repository.PersonRepository;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public Person create(Person person) {
        return personRepository.save(person);
    }

    public Person update(Person person) {
        Person personSaved = personRepository.findById(person.getId())
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        personSaved.setName(person.getName());
        return personRepository.save(personSaved);
    }

    public void delete(Long id) {
        Person personSaved = personRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        personRepository.delete(personSaved);
    }

    public List<Person> listAll() {
        return personRepository.findAll();
    }
}
