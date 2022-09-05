package com.example.elasticsearch.service;

import com.example.elasticsearch.bean.DocBean;
import org.springframework.data.domain.Page;

import java.util.Iterator;
import java.util.List;

public interface IElasticService {

/*
    void createIndex();

    void deleteIndex(String index);

    void save(DocBean docBean);
*/

    void saveALl(List<DocBean> list);

    Iterator<DocBean> findAll();

    Page<DocBean> findByContent(String content);
}
