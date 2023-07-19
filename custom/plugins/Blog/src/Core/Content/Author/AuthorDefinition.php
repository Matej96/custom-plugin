<?php declare(strict_types=1);

namespace Blog\Core\Content\Author;

use Blog\Core\Content\Blog\BlogDefinition;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\CascadeDelete;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class AuthorDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'custom_author';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return AuthorCollection::class;
    }

    public function getEntityClass(): string
    {
        return AuthorEntity::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey(), new ApiAware()),
            (new StringField('first_name', 'firstName')),
            (new StringField('last_name', 'lastName')),
            (new StringField('email', 'email')),

            (new FkField('media_id', 'mediaId', MediaDefinition::class))->addFlags(new ApiAware(), new Required()),
            (new ManyToOneAssociationField('media', 'media_id', MediaDefinition::class, 'id', true))->addFlags(new ApiAware()),
            (new OneToManyAssociationField('blogs', BlogDefinition::class, 'author_id', 'id'))->addFlags(new CascadeDelete())
        ]);
    }
}