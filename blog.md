---
layout: default
title: Blog
permalink: /blog/
---

# Blog

Latest articles and insights about web development, AI, and technology.

<div class="blog-list">
  {%- for post in site.posts -%}
    <div class="blog-item">
      <h3>
        <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </h3>
      <div class="meta">
        <span class="date">📅 {{ post.date | date: "%b %d, %Y" }}</span>
        {%- if post.reading_time -%}
          <span class="reading-time">📖 {{ post.reading_time }}</span>
        {%- endif -%}
        {%- if post.author -%}
          <span class="author">✍️ {{ post.author }}</span>
        {%- endif -%}
      </div>
      <p class="excerpt">{{ post.description | default: post.excerpt | strip_html | truncatewords: 30 }}</p>
      <a href="{{ post.url | relative_url }}" class="read-more">Read more →</a>
    </div>
  {%- endfor -%}
</div>
