---
layout: default
title: Blog
permalink: /blog/
---

# Blog

<div class="blog-list">
  {% for post in site.posts %}
    <div class="blog-item">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.date | date: "%b %-d, %Y" }}</p>
      <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
      <a href="{{ post.url | relative_url }}">Read more</a>
    </div>
  {% endfor %}
</div>
