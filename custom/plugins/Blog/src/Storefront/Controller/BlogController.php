<?php declare(strict_types=1);

namespace Blog\Storefront\Controller;

use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Storefront\Controller\StorefrontController;
use Shopware\Storefront\Page\GenericPageLoaderInterface;
use Shopware\Storefront\Page\Navigation\NavigationPage;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route(defaults={"_routeScope"={"storefront"}})
 */
class BlogController extends StorefrontController
{
    private GenericPageLoaderInterface $genericPageLoader;

    private EntityRepository $blogRepository;

    public function __construct(GenericPageLoaderInterface $genericPageLoader, EntityRepository $blogRepository)
    {
        $this->genericPageLoader = $genericPageLoader;
        $this->blogRepository = $blogRepository;
    }

    /**
     * @Route("/blogs", name="frontend.blog", methods={"GET"})
     */
    public function showExample(Request $request, SalesChannelContext $context): Response
    {
        $page = $this->genericPageLoader->load($request, $context);
        $page = NavigationPage::createFrom($page);

        $criteria = new Criteria();

        $criteria->addAssociation('author');

        $blogs = $this->blogRepository->search($criteria, $context->getContext())->getEntities();

        return $this->renderStorefront('@Blog/storefront/page/index.html.twig', [
            'page' => $page,
            'blogs'=> $blogs
        ]);
    }
}