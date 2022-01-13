package com.example.elasticsearch.controller;

import com.example.elasticsearch.bean.DocBean;
import com.example.elasticsearch.service.IElasticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/elastic")
public class ElasticController {

    @Autowired
    private IElasticService elasticService;

    @GetMapping("/add")
    public void add() {
        List<DocBean> list = new ArrayList<>();
        list.add(new DocBean(1L, "title1", "content1", 1));
        list.add(new DocBean(2L, "title2", "content2", 1));
        list.add(new DocBean(3L, "title3", "content3", 1));

        elasticService.saveALl(list);
    }

    @GetMapping("/all")
    public Iterator<DocBean> all() {
        return elasticService.findAll();
    }

    @GetMapping("/find")
    public Page<DocBean> find () {
        return elasticService.findByContent("content");
    }
}

