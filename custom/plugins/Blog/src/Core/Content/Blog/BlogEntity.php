<?php declare(strict_types=1);

namespace Blog\Core\Content\Blog;

use Blog\Core\Content\Author\AuthorEntity;
use Shopware\Core\Content\Media\MediaEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class BlogEntity extends Entity
{
    use EntityIdTrait;

    /**
     * @var string
     */
    protected $title;

    /**
     * @var string
     */
    protected $authorId;

    /**
     * @var AuthorEntity|null
     */
    protected $author;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var string
     */
    protected $mediaId;

    /**
     * @var MediaEntity|null
     */
    protected $media;

    /**
     * @var string
     */
    protected $secondMediaId;

    /**
     * @var MediaEntity|null
     */
    protected $secondMedia;

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getAuthorId(): string
    {
        return $this->authorId;
    }

    /**
     * @param string $authorId
     */
    public function setAuthorId(string $authorId): void
    {
        $this->authorId = $authorId;
    }

    /**
     * @return AuthorEntity|null
     */
    public function getAuthor(): ?AuthorEntity
    {
        return $this->author;
    }

    /**
     * @param AuthorEntity|null $author
     */
    public function setAuthor(?AuthorEntity $author): void
    {
        $this->author = $author;
    }

    /**
     * @return string
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return string
     */
    public function getMediaId(): string
    {
        return $this->mediaId;
    }

    /**
     * @param string $mediaId
     */
    public function setMediaId(string $mediaId): void
    {
        $this->mediaId = $mediaId;
    }

    /**
     * @return MediaEntity|null
     */
    public function getMedia(): ?MediaEntity
    {
        return $this->media;
    }

    /**
     * @param MediaEntity|null $media
     */
    public function setMedia(?MediaEntity $media): void
    {
        $this->media = $media;
    }

    /**
     * @return string
     */
    public function getSecondMediaId(): string
    {
        return $this->secondMediaId;
    }

    /**
     * @param string $secondMediaId
     */
    public function setSecondMediaId(string $secondMediaId): void
    {
        $this->secondMediaId = $secondMediaId;
    }

    /**
     * @return MediaEntity|null
     */
    public function getSecondMedia(): ?MediaEntity
    {
        return $this->secondMedia;
    }

    /**
     * @param MediaEntity|null $secondMedia
     */
    public function setSecondMedia(?MediaEntity $secondMedia): void
    {
        $this->secondMedia = $secondMedia;
    }
}
