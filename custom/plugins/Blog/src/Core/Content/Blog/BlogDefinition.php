<?php declare(strict_types=1);

namespace Blog\Core\Content\Blog;

use Blog\Core\Content\Author\AuthorDefinition;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\AllowHtml;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\LongTextField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class BlogDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'custom_blog';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return BlogCollection::class;
    }

    public function getEntityClass(): string
    {
        return BlogEntity::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey(), new ApiAware()),
            (new StringField('title', 'title')),
            (new LongTextField('description', 'description'))->addFlags(new AllowHtml()),

            (new FkField('media_id', 'mediaId', MediaDefinition::class))->addFlags(new ApiAware(), new Required()),
            (new ManyToOneAssociationField('media', 'media_id', MediaDefinition::class, 'id', true))->addFlags(new ApiAware()),

            (new FkField('second_media_id', 'secondMediaId', MediaDefinition::class))->addFlags(new ApiAware(), new Required()),
            (new ManyToOneAssociationField('secondMedia', 'second_media_id', MediaDefinition::class, 'id', true))->addFlags(new ApiAware()),

            (new FkField('author_id', 'authorId', AuthorDefinition::class))->addFlags(new Required()),
            (new ManyToOneAssociationField('author', 'author_id', AuthorDefinition::class, 'id', false))->addFlags(new ApiAware())
        ]);
    }
}