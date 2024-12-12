package com.leilao.backend.service;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.leilao.backend.model.Auction;
import com.leilao.backend.model.Images;
import com.leilao.backend.model.Person;
import com.leilao.backend.repository.AuctionRepository;
import com.leilao.backend.security.AuthPersonProvider;

@Service
public class AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private AuthPersonProvider authPersonProvider;

    public Auction create(Auction auction, List<MultipartFile> files) {
        auction.setPerson(authPersonProvider.getAuthenticatedUser());

        if (files != null && !files.isEmpty()) {
            List<Images> images = files.stream()
                    .map(this::processImage)
                    .collect(Collectors.toList());
            images.forEach(image -> image.setAuction(auction));
            auction.setImages(images);
        }

        return auctionRepository.save(auction);
    }

    public Auction update(Auction auction, List<MultipartFile> files) {
        Auction auctionSaved = auctionRepository.findById(auction.getId())
                .orElseThrow(() -> new NoSuchElementException("Leilão não encontrado"));

        auctionSaved.setTitle(auction.getTitle());
        auctionSaved.setDescription(auction.getDescription());
        auctionSaved.setStartDateTime(auction.getStartDateTime());
        auctionSaved.setEndDateTime(auction.getEndDateTime());
        auctionSaved.setStatus(auction.getStatus());
        auctionSaved.setObservation(auction.getObservation());
        auctionSaved.setIncrementValue(auction.getIncrementValue());

        if (files != null && !files.isEmpty()) {
            if (auctionSaved.getImages() != null) {
                auctionSaved.getImages().clear();
            }

            List<Images> images = files.stream()
                    .map(this::processImage)
                    .collect(Collectors.toList());
            images.forEach(image -> image.setAuction(auctionSaved));
            auctionSaved.setImages(images);
        }

        return auctionRepository.save(auctionSaved);
    }

    public void delete(Long id) {
        Auction auctionSaved = auctionRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Leilão não encontrado"));
        auctionRepository.delete(auctionSaved);
    }

    public List<Auction> listAll() {
        Person authenticatedUser = authPersonProvider.getAuthenticatedUser();
        return auctionRepository.findByPerson(authenticatedUser);
    }

    public List<Auction> listAllPublic() {
        return auctionRepository.findAll();
    }

    public Auction findById(Long id) {
        Person authenticatedUser = authPersonProvider.getAuthenticatedUser();
        Auction auction = auctionRepository.findByIdAndPerson(id, authenticatedUser);
        if (auction == null) {
            throw new NoSuchElementException("Leilão não encontrado ou não pertence ao usuário autenticado");
        }
        return auction;
    }

    private Images processImage(MultipartFile file) {
        Images image = new Images();
        image.setFileName(file.getOriginalFilename());
        image.setFileType(file.getContentType());
        try {
            image.setData(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Erro ao processar imagem", e);
        }
        return image;
    }
}
