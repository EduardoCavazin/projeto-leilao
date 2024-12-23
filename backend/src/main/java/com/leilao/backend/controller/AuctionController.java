package com.leilao.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leilao.backend.model.Auction;
import com.leilao.backend.service.AuctionService;

@RestController
@RequestMapping("/api/auctions")
@CrossOrigin
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Auction> create(
            @RequestPart("auctions") String auctionJson,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) {
        try {
            Auction auction = objectMapper.readValue(auctionJson, Auction.class);
            Auction createdAuction = auctionService.create(auction, files);
            return ResponseEntity.ok(createdAuction);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Auction> update(
            @PathVariable Long id,
            @RequestPart("auctions") String auctionJson,
            @RequestPart(value = "files", required = false) List<MultipartFile> files) throws Exception {
        Auction auction = objectMapper.readValue(auctionJson, Auction.class);
        auction.setId(id);
        Auction updatedAuction = auctionService.update(auction, files);
        return ResponseEntity.ok(updatedAuction);
    }

    @GetMapping
    public List<Auction> listAll() {
        return auctionService.listAll();
    }

    @GetMapping("/public")
    public List<Auction> listAllPublic() {
        return auctionService.listAllPublic();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        auctionService.delete(id);
    }
}
