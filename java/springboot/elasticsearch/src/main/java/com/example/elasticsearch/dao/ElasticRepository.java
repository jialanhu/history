package com.example.elasticsearch.dao;

import com.example.elasticsearch.bean.DocBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ElasticRepository  extends ElasticsearchRepository<DocBean, Long> {

    Page<DocBean> findByContentLike(String content, Pageable pageable);
}
