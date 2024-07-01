<?php 

namespace Custom\SwatchTitle\Plugin\Product\View\Type;

class ConfigurablePlugin
{
    protected $jsonEncoder;
    protected $jsonDecoder;

    public function __construct(
        \Magento\Framework\Json\DecoderInterface $jsonDecoder,
        \Magento\Framework\Json\EncoderInterface $jsonEncoder
    ){
        $this->jsonEncoder = $jsonEncoder;
        $this->jsonDecoder = $jsonDecoder;
    }

    public function afterGetJsonConfig(\Magento\ConfigurableProduct\Block\Product\View\Type\Configurable $subject, $result)
    {
        $result = $this->jsonDecoder->decode($result);
        $currentProduct = $subject->getProduct();

        if ($currentProduct->getName()) {
            $result['productName'] = $currentProduct->getName();
        }
        if ($currentProduct->getDescription()) {
            $result['productDescription'] = $currentProduct->getDescription();
        }
        if ($currentProduct->getSku()) {
            $result['productSku'] = $currentProduct->getSku();
        }
        if ($currentProduct->getEstimatedTime()) {
            $result['productEstimatedTime'] = $currentProduct->getEstimatedTime() ?? '';
        }

        foreach ($subject->getAllowProducts() as $product) {
            $result['names'][$product->getId()][] =
                [
                    'name' => $product->getData('name'),
                ];
            $result['descriptions'][$product->getId()][] =
                [
                    'description' => $product->getData('description'),
                ];
            $result['skus'][$product->getId()][] =
                [
                    'sku' => $product->getData('sku'),
                ];
            $result['estimated_times'][$product->getId()][] =
                [
                    'estimated_time' => !empty($product->getData('estimated_time')) ? __('Estimated Delivery Time : ') . $product->getData('estimated_time') : '',
                ];
        }
        return $this->jsonEncoder->encode($result);
    }
}